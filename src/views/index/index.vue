<template>
    <div class="index-page">
        <img
            v-if="posterImg"
            @click="$ImagePreview([posterImg])"
            :src="posterImg"
            alt=""
        />
        <div
            v-else
            class="poster-wrap"
            id="posterWrap"
            :style="{ 'background-image': 'url(' + backImg + ')' }"
        >
            <div class="cartoon-img">
                <img v-if="cartoonImg" :src="cartoonImg" alt="" />
            </div>
            <div class="greeting">
                <img :src="qrcodeImg" alt="" />
                <div class="right">
                    <div class="title">五十六个名族，五十六枝花。</div>
                    <div class="desc">[长按识别二维码，一键生成漫画脸]</div>
                </div>
            </div>
        </div>

        <div class="uploader-wrap">
            <van-uploader
                class="uploader"
                result-type="dataUrl"
                :before-read="beforeRead"
                :after-read="afterRead"
            >
                <van-button
                    :icon="posterImg ? 'replay' : 'plus'"
                    color="#FF5A5F"
                    type="primary"
                >
                    {{ posterImg ? '重新上传' : '开始制作' }}
                </van-button>
            </van-uploader>
        </div>
    </div>
</template>

<script>
// compressorjs 是一个开源的图片处理库，提供了图片压缩、图片旋转等能力: https://github.com/fengyuanchen/compressorjs
import Compressor from 'compressorjs';
import html2canvas from 'html2canvas';
import { getAccessToken, photo2cartoon } from '@/utils/index';

export default {
    data() {
        return {
            backImg: require('@/assets/images/back_2.png'),
            qrcodeImg: require('@/assets/images/qrcode.png'), // 页面二维码
            accessToken: '', // token
            originalImg: '', // 原图
            cartoonImg: '', // 卡通图
            posterImg: '', // 最终分享的海报
            loading: null, // 加载中
        };
    },
    mounted() {
        getAccessToken().then((res) => {
            this.accessToken = res;
        });
    },
    methods: {
        // 上传前置处理，压缩、修正图片方向
        beforeRead(file) {
            this.resetPage();
            return new Promise((resolve) => {
                // compressorjs 默认开启 checkOrientation 选项, 会将图片修正为正确方向
                new Compressor(file, {
                    quality: 0.8,
                    success: resolve,
                    error(err) {
                        console.log(err.message);
                    },
                });
            });
        },
        // 文件上传完毕，转卡通头像
        afterRead(file) {
            this.originalImg = file.content;
            this.photo2cartoon(file);
        },
        // 照片转漫画风
        photo2cartoon(file) {
            this.loading = this.$Toast.loading({
                message: '正在合成...',
                duration: 0,
                forbidClick: true,
            });
            photo2cartoon(file.content, this.accessToken).then((res) => {
                if (res?.image) {
                    this.cartoonImg = 'data:image/png;base64,' + res.image;

                    // 绘制海报
                    this.$nextTick(() => {
                        this.drawPoster();
                    });
                } else {
                    this.resetPage();
                    this.$Dialog({ message: '生成漫画脸失败，请稍后再试' });
                }
            });
        },
        // 绘制海报
        drawPoster() {
            let self = this;
            window.scroll(0, 0);
            setTimeout(() => {
                html2canvas(document.getElementById('posterWrap'), {
                    useCORS: true,
                    logging: true,
                    // backgroundColor: null,
                })
                    .then((canvas) => {
                        this.loading.clear();
                        self.posterImg = canvas.toDataURL('image/jpeg', 1);
                        self.$ImagePreview([this.posterImg]);
                    })
                    .catch((err) => {
                        console.log(err);
                        self.resetPage();
                        self.$Dialog({ message: '生成海报失败，请稍后再试' });
                    });
            }, 300);
        },
        // 重置
        resetPage() {
            this.originalImg = '';
            this.cartoonImg = '';
            this.posterImg = '';
            this.loading?.clear();
        },
    },
};
</script>

<style lang="less" scoped>
.index-page {
    min-height: 100vh;
    overflow: hidden auto;
}

@canvasHei: 85vh;

.poster-wrap {
    widows: 375px;
    height: 375px;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;

    .cartoon-img {
        height: 275px;
        .flex-center;

        img {
            height: 70%;
            border: 4px solid #fff;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
            border-radius: 6px;
        }
    }

    .greeting {
        height: 90px;
        background-color: #fff;
        margin: 0 10px 10px 10px;
        border-radius: 12px;
        padding: 10px;
        box-sizing: border-box;
        .flex-between;

        img {
            width: 70px;
            height: 70px;
            padding: 5px;
            box-sizing: border-box;
        }

        .right {
            width: 255px;
            .title {
                font-size: 18px;
                font-weight: bold;
                // .text-overflow(1);
                overflow: hidden;
            }
            .desc {
                margin-top: 10px;
                font-size: 12px;
                color: #787e86;
            }
        }
    }
}

.uploader-wrap {
    position: fixed;
    left: 0;
    width: 100%;
    bottom: calc(20px + constant(safe-area-inset-bottom));
    bottom: calc(20px + env(safe-area-inset-bottom));
    text-align: center;

    .van-button {
        border-radius: 4px;
        font-weight: bold;

        .van-button__icon {
            font-weight: bold;
        }
    }
}
</style>
