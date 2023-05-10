class Feed {
    constructor() {
      this.data = []; //! placeholder - will replace with DB later
    }
  
    async getRecentFeedData() {
      //! implement logic to fetch recent feed data
        return this.data;
    }
  }
  
  module.exports = new Feed();
  