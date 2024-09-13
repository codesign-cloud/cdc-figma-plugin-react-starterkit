// Figma storage wrapper | @thinkdj 10 Sep 2024
// REF: https://www.figma.com/plugin-docs/api/figma-clientStorage/

export const storage = {

    async get(key: string): Promise<any> {
        try {
            const value = await figma.clientStorage.getAsync(key);
            return value;
        } catch (error) {
            console.error(`Error retrieving value for key "${key}":`, error);
            return undefined;
        }
    },

    async set(key: string, value: any): Promise<boolean> {
        try {
            await figma.clientStorage.setAsync(key, value);
            return true;
        } catch (error) {
            console.error(`Error setting value for key "${key}":`, error);
            return false;
        }
    },

    async delete(key: string): Promise<boolean> {
        try {
            await figma.clientStorage.deleteAsync(key);
            return true;
        } catch (error) {
            console.error(`Error deleting value for key "${key}":`, error);
            return false;
        }
    },

    async getAll(): Promise<{ [key: string]: any }> {
        try {
            const keys = await figma.clientStorage.keysAsync();
            const values = await Promise.all(keys.map(key => this.get(key)));
            return keys.reduce<{ [key: string]: any }>((acc, key, index) => {
                acc[key] = values[index];
                return acc;
            }, {});
        } catch (error) {
            console.error("Error retrieving all storage values:", error);
            return {};
        }
    },

    async deleteAll(): Promise<boolean> {
        try {
            const keys = await figma.clientStorage.keysAsync();
            await Promise.all(keys.map(key => this.delete(key)));
            return true;
        } catch (error) {
            console.error("Error clearing storage:", error);
            return false;
        }
    }

};
