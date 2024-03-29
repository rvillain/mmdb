export class Notification {
    /**
     * Show success notification
     *
     * @param {Object} vueInstance - Vue instance
     * @param {String} message - Message which to display on Notification
     */
    static success(vueInstance: any, message: string) {
        vueInstance.$notify({
            group: 'global',
            type: 'success',
            text: message,
            duration: 3500
        })
    }

    /**
     * Show error notification
     *
     * @param {Object} vueInstance - Vue instance
     * @param {String} message - Message which to display on Notification
     */
    static error(vueInstance: any, message: string) {
        vueInstance.$notify({
            group: 'global',
            type: 'error',
            text: message,
            duration: 5000
        })
    }

    /**
     * Show warn notification
     *
     * @param {Object} vueInstance - Vue instance
     * @param {String} message - Message which to display on Notification
     */
    static warning(vueInstance: any, message: string) {
        vueInstance.$notify({
            group: 'global',
            type: 'warn',
            text: message,
            duration: 5000
        })
    }
}
