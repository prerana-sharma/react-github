const DateConvert = date => {
      var unitmapping = {
        days: 24 * 60 * 60 * 1000,
        hours: 60 * 60 * 1000,
        minutes: 60 * 1000
      };
  
      function ceil(value) {
        return Math.ceil(value);
      }
  
      function getHumanizedDiff(diff) {
        let days = Math.abs(ceil(diff / unitmapping.days)) > 0 ? `${Math.abs(ceil(diff / unitmapping.days))} days` : 0;
        let hours = Math.abs(ceil((diff % unitmapping.days) / unitmapping.hours)) > 0 ? `${Math.abs(ceil((diff % unitmapping.days) / unitmapping.hours))} hours` : 0;

        return (`${days ? days : hours} `);
      }
  
      const duration = getHumanizedDiff(
        new Date(date).getTime() -
          new Date().getTime()
      );
      return duration;
  };
  export default DateConvert;