import request from './request';

/**
 * 获取 Access Token
 * https://ai.baidu.com/ai-doc/REFERENCE/Ck3dwjhhu#%E8%8E%B7%E5%8F%96access-token
 * @param {String} grant_type 必须参数，固定为client_credentials；
 * @param {String} client_id 必须参数，应用的API Key；
 * @param {String} client_secret 必须参数，应用的Secret Key；
 * @returns {String} access_token
 */
export async function getAccessToken() {
    const client_id = 'Yh1GyecakIZ1GnwStq2hDZ45';
    const client_secret = 'kP5PoKZmcDO1imtFrfMGqGkwKYFAG7oD';
    const { access_token } = await request(
        `/oauth/2.0/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    );
    return access_token;
}

/**
 * 人像转卡通图片
 * https://cloud.baidu.com/doc/IMAGEPROCESS/s/Mk4i6olx5#%E8%AF%B7%E6%B1%82%E8%AF%B4%E6%98%8E
 * @param {String} image 必须参数，base64图片，不含图片头
 * @param {String} access_token 必须参数
 * @returns {Object}
 */
export async function photo2cartoon(image, access_token) {
    // 去掉base64的头部信息
    image = image.replace(/^data:image\/\w+;base64,/, '');

    //  参数序列化
    const params = new URLSearchParams();
    params.append('type', 'anime');
    params.append('image', image);

    const res = await request.post(
        `/rest/2.0/image-process/v1/selfie_anime?access_token=${access_token}`,
        params
    );

    return res;
}
