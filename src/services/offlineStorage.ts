export class OfflineStorage {
  async saveData(key: string, data: any) {
    try {
      await localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
  
  async getData(key: string) {
    try {
      const data = await localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }
} 