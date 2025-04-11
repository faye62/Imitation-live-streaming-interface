class MyStorage {
    static userInfoKey = 'smst_app_user'
    static storeKey = 'smst_app_store'
    /**
     * -------------------- 关于user --------------------
     */
    static isLogin() {
        if (!localStorage.getItem(this.userInfoKey)) {
            return false
        }
        try {
            const token = this.getUserToken()
            if (!token) {
                return false
            }
        }catch (error) {
            return false;
        }
        return true;
    }

    static getUserToken() {
        try {
            return JSON.parse(localStorage.getItem(this.userInfoKey)).token
        } catch (e) {
            console.log('获取token失败: ' + e);
            return null
        }
    }

    static getUserInfo() {
        return JSON.parse(localStorage.getItem(this.userInfoKey))
    }

    static getUserId() {
        return JSON.parse(localStorage.getItem(this.userInfoKey)).userId
    }

    static getIsCenterKitchen() {
        return JSON.parse(localStorage.getItem(this.userInfoKey)).centerKitchenPermission === 1
    }

    static setUserInfo(info) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(info))
    }


    /**
     * -------------------- 关于店铺 --------------------
     */
    static setStoreInfo(storeInfo) {
        localStorage.setItem(this.storeKey, JSON.stringify(storeInfo))
    }

    // 获取店铺信息 -> {handleList:[], queryList:[]}
    static getAllStoreInfo() {
        return JSON.parse(localStorage.getItem(this.storeKey))
    }

    // 获取查询权限的店铺
    static getQueryStoreList() {
        return this.getAllStoreInfo().queryList
    }

    // 获取操作权限的店铺
    static getHandleStoreList() {
        return this.getAllStoreInfo().handleList
    }

    // 获取所有店铺
    static getAllStoreList() {
        return this.getQueryStoreList().concat(this.getHandleStoreList())
    }

    static clearUser() {
        localStorage.removeItem(this.userInfoKey)
        localStorage.removeItem(this.storeKey)
    }
}

export default MyStorage
