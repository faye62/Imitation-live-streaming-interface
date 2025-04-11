import {defineStore} from 'pinia';

export const useImageStore = defineStore('image', {
    state: () => ({
        baseImgPath: {
            1: '',
            162: '',
        },
        currentTenantId: '1',
        currentImgPath: '',
    }),
    actions: {
        setTenantId(id) {
            this.currentTenantId = id;
            this.setImgPath();
        },
        setImgPath() {
            this.currentImgPath = this.baseImgPath[this.currentTenantId] || '';
        },
    },
});
