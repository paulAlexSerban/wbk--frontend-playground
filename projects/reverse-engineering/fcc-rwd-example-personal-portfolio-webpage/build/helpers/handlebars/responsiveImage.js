const assetsUrl = require('./assetsUrl');

const aspectRatiosArr = ['1x1', '4x3', '16x9', '21x9', '3x4'];
const widthsArr = [480, 960, 1280, 1920, 2560];

const paths = (path, resource) => ({
    '1x1': {
        480: {
            src: `${assetsUrl(path, resource)}-480_480.webp`,
            srcset: `${assetsUrl(path, resource)}-480_480.webp 480w`,
        },
        960: {
            src: `${assetsUrl(path, resource)}-960_960.webp`,
            srcset: `${assetsUrl(path, resource)}-960_960.webp 960w`,
        },
        1280: {
            src: `${assetsUrl(path, resource)}-1280_1280.webp`,
            srcset: `${assetsUrl(path, resource)}-1280_1280.webp 1280w`,
        },
        1920: {
            src: `${assetsUrl(path, resource)}-1920_1920.webp`,
            srcset: `${assetsUrl(path, resource)}-1920_1920.webp 1920w`,
        },
        2560: {
            src: `${assetsUrl(path, resource)}-2560_2560.webp`,
            srcset: `${assetsUrl(path, resource)}-2560_2560.webp 2560w`,
        },
    },
    '4x3': {
        480: {
            src: `${assetsUrl(path, resource)}-480_360.webp`,
            srcset: `${assetsUrl(path, resource)}-480_360.webp 480w`,
        },
        960: {
            src: `${assetsUrl(path, resource)}-960_720.webp`,
            srcset: `${assetsUrl(path, resource)}-960_720.webp 960w`,
        },
        1280: {
            src: `${assetsUrl(path, resource)}-1280_960.webp`,
            srcset: `${assetsUrl(path, resource)}-1280_960.webp 1280w`,
        },
        1920: {
            src: `${assetsUrl(path, resource)}-1920_1440.webp`,
            srcset: `${assetsUrl(path, resource)}-1920_1440.webp 1920w`,
        },
        2560: {
            src: `${assetsUrl(path, resource)}-2560_1920.webp`,
            srcset: `${assetsUrl(path, resource)}-2560_1920.webp 2560w`,
        },
    },
    '16x9': {
        480: {
            src: `${assetsUrl(path, resource)}-480_270.webp`,
            srcset: `${assetsUrl(path, resource)}-480_270.webp 480w`,
        },
        960: {
            src: `${assetsUrl(path, resource)}-960_540.webp`,
            srcset: `${assetsUrl(path, resource)}-960_540.webp 960w`,
        },
        1280: {
            src: `${assetsUrl(path, resource)}-1280_720.webp`,
            srcset: `${assetsUrl(path, resource)}-1280_720.webp 1280w`,
        },
        1920: {
            src: `${assetsUrl(path, resource)}-1920_1080.webp`,
            srcset: `${assetsUrl(path, resource)}-1920_1080.webp 1920w`,
        },
        2560: {
            src: `${assetsUrl(path, resource)}-2560_1440.webp`,
            srcset: `${assetsUrl(path, resource)}-2560_1440.webp 2560w`,
        },
    },
    '21x9': {
        480: {
            src: `${assetsUrl(path, resource)}-480_228.webp`,
            srcset: `${assetsUrl(path, resource)}-480_228.webp 480w`,
        },
        960: {
            src: `${assetsUrl(path, resource)}-960_456.webp`,
            srcset: `${assetsUrl(path, resource)}-960_456.webp 960w`,
        },
        1280: {
            src: `${assetsUrl(path, resource)}-1280_608.webp`,
            srcset: `${assetsUrl(path, resource)}-1280_608.webp 1280w`,
        },
        1920: {
            src: `${assetsUrl(path, resource)}-1920_912.webp`,
            srcset: `${assetsUrl(path, resource)}-1920_912.webp 1920w`,
        },
        2560: {
            src: `${assetsUrl(path, resource)}-2560_1216.webp`,
            srcset: `${assetsUrl(path, resource)}-2560_1216.webp 2560w`,
        },
    },
    '3x4': {
        480: {
            src: `${assetsUrl(path, resource)}-360_480.webp`,
            srcset: `${assetsUrl(path, resource)}-360_480.webp 480w`,
        },
        960: {
            src: `${assetsUrl(path, resource)}-720_960.webp`,
            srcset: `${assetsUrl(path, resource)}-720_960.webp 960w`,
        },
        1280: {
            src: `${assetsUrl(path, resource)}-960_1280.webp`,
            srcset: `${assetsUrl(path, resource)}-960_1280.webp 1280w`,
        },
        1920: {
            src: `${assetsUrl(path, resource)}-1440_1920.webp`,
            srcset: `${assetsUrl(path, resource)}-1440_1920.webp 1920w`,
        },
        2560: {
            src: `${assetsUrl(path, resource)}-1920_2560.webp`,
            srcset: `${assetsUrl(path, resource)}-1920_2560.webp 2560w`,
        },
    },
});
function responsiveImage(path, resource, ratiosStr, widthsStr) {
    const ratios = JSON.parse(ratiosStr);
    const widths = JSON.parse(widthsStr);

    const srcsets = {
        xs: paths(path, resource)[aspectRatiosArr[ratios[0]]][widthsArr[widths[0]]],
        sm: paths(path, resource)[aspectRatiosArr[ratios[1]]][widthsArr[widths[1]]],
        md: paths(path, resource)[aspectRatiosArr[ratios[2]]][widthsArr[widths[2]]],
        lg: paths(path, resource)[aspectRatiosArr[ratios[3]]][widthsArr[widths[3]]],
        xl: paths(path, resource)[aspectRatiosArr[ratios[4]]][widthsArr[widths[4]]],
    };
    return `
      ${srcsets.xs.srcset}, ${srcsets.sm.srcset}, ${srcsets.md.srcset}, ${srcsets.lg.srcset}, ${srcsets.xl.srcset}
    `;
}

// const image = responsiveImage("images", "imageName", "[0,0,0,0,0]", "[0,1,2,3,4]");
// console.log(image);

module.exports = responsiveImage;
