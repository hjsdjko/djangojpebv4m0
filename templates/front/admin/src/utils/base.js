const base = {
    get() {
        return {
            url : "http://localhost:8080/djangojpebv4m0/",
            name: "djangojpebv4m0",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "豆果美食推荐系统"
        } 
    }
}
export default base
