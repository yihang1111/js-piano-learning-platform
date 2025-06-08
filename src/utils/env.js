let baseUrl = '';
let routerMode = 'hash';
let baseImgPath;

if(process.env.NODE_ENV == 'development'){
    baseUrl = 'http://localhost:3000'
    baseImgPath = 'http://localhost:3000'
}
export{
    baseUrl,
    routerMode,
    baseImgPath

}