const Homey = require('homey');
const HomeyLog = require("homey-betterstack");
const App = require('homey');

class DutchFlagDay extends HomeyLog {



    // -------------------- INIT ----------------------
    async onInit() {
        try {
          this.log(`${Homey.manifest.id} - ${Homey.manifest.version} started...`);
          this.sendNotifications();
        } catch (error) {
          this.homey.app.log(error);
        }
      }



    // -------------------- Notification updates ----------------------
    async sendNotifications() {
        try {
            //const ntfy2023100401 = `It's time to set up a **party**!`;

            //await this.homey.notifications.createNotification({
            //excerpt: ntfy2023100401
            //});
        } catch (error) {
            this.log('sendNotifications - error', error); 
        }


 // -------------------- Trigger cards ----------------------
 
 

 
 function getNthWeekdayOfMonth(month, n, weekday) {
  let date = new Date(new Date().getFullYear(), month, 1);
  let count = 0;

  while (count < n) {
      if (date.getDay() === weekday) {
          count++;
      }

      if (count < n) {
          date.setDate(date.getDate() + 1);
      }
  }

  return date.getDate();
}


function getNthWeekdayOfMonth(month, n, weekday) {
    let date = new Date(new Date().getFullYear(), month, 1);
    let count = 0;

    while (count < n) {
        if (date.getDay() === weekday) {
            count++;
        }

        if (count < n) {
            date.setDate(date.getDate() + 1);
        }
    }

    return date.getDate();
}

this.homey.flow.getTriggerCard('dutch-flag-day')
.registerRunListener(async (args, state) => {
 const timeZone = 'Europe/Amsterdam';
 const currentDate = new Date();
 const today = new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(currentDate).split('/');
 const currentMonth = parseInt(today[0]);
 const currentDay = parseInt(today[1]);

 const holidays = [
  { name: "Verjaardag prinses Beatrix", month: 0, day: 31 },
  { name: "Koningsdag", month: 3, day: 27 },
  { name: "Dodenherdenking", month: 4, day: 4 },
  { name: "Bevrijdingsdag", month: 4, day: 5 },
  { name: "Verjaardag koningin Máxima", month: 4, day: 17 },
  { name: "Veteranendag", month: 5, week: -1, day: 6 },
  { name: "Formeel einde Tweede Wereldoorlog", month: 7, day: 15 },
  { name: "Prinsjesdag", month: 8, week: 3, day: 2 },
  { name: "Verjaardag prinses Catharina-Amalia", month: 11, day: 7 },
  { name: "Koninkrijksdag", month: 11, day: 15 }
 ];

 for (const holiday of holidays) {
   if (holiday.week) {
      if (holiday.month === currentMonth && getNthWeekdayOfMonth(currentMonth, holiday.week, holiday.day) === currentDay) {
          this.homey.flow.getTriggerCard('dutch-flag-day').trigger({
              flagDay: holiday.name
          });
          return Promise.resolve(true);
      }
  } else if (holiday.month === currentMonth && holiday.day === currentDay) {
      this.homey.flow.getTriggerCard('dutch-flag-day').trigger({
          flagDay: holiday.name
      });
      return Promise.resolve(true);
  }
 }
 return Promise.resolve(false);
});

this.homey.flow.getTriggerCard('dutch-flag-day-time')
.registerRunListener(async (args, state) => {
    // Stel de tijdzone in voor Amsterdam.
    const timeZone = 'Europe/Amsterdam';

    const currentDate = new Date();
 
    const formattedDate = new Intl.DateTimeFormat('en-US', { 
        timeZone, 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    }).format(currentDate);
    const [currentMonth, currentDay] = formattedDate.split('/').map(Number);
  
    const currentHour = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
   
    const [userHour, userMinutes] = args.run_at.split(':').map(Number);

    if (currentHour !== userHour || currentMinutes !== userMinutes) {
        return Promise.resolve(false);
    }

    const holidays = [
      { name: "Verjaardag prinses Beatrix", month: 0, day: 31 },
      { name: "Koningsdag", month: 3, day: 27 },
      { name: "Dodenherdenking", month: 4, day: 4 },
      { name: "Bevrijdingsdag", month: 4, day: 5 },
      { name: "Verjaardag koningin Máxima", month: 4, day: 17 },
      { name: "Veteranendag", month: 5, week: -1, day: 6 },
      { name: "Formeel einde Tweede Wereldoorlog", month: 7, day: 15 },
      { name: "Prinsjesdag", month: 8, week: 3, day: 2 },
      { name: "Verjaardag prinses Catharina-Amalia", month: 11, day: 7 },
      { name: "Koninkrijksdag", month: 11, day: 15 }
     ];

    for (const holiday of holidays) {
        if (holiday.week) {
            if (holiday.month === currentMonth && getNthWeekdayOfMonth(currentMonth, holiday.week, holiday.day) === currentDay) {
                this.homey.flow.getTriggerCard('dutch-flag-day').trigger({
                    flagDay: holiday.name
                });
                return Promise.resolve(true);
            }
        } else if (holiday.month === currentMonth && holiday.day === currentDay) {
            this.homey.flow.getTriggerCard('dutch-flag-day').trigger({
                flagDay: holiday.name
            });
            return Promise.resolve(true);
        }
    }

    return Promise.resolve(false);
});



 

    // -------------------- Condition cards ----------------------                       
            

               this.homey.flow.getConditionCard('dutch-flag-day')
               .registerRunListener(async (args, state) => {
                   const { isFlagDay } = args;
           
                   const today = new Date();
                   const currentMonth = today.getMonth();
                   const currentDay = today.getDate();
           
                   const flagDays = [
                       { name: "Verjaardag prinses Beatrix", month: 0, day: 31 },
                       { name: "Koningsdag", month: 3, day: 27 },
                       { name: "Dodenherdenking", month: 4, day: 4 },
                       { name: "Bevrijdingsdag", month: 4, day: 5 },
                       { name: "Verjaardag koningin Máxima", month: 4, day: 17 },
                       { name: "Veteranendag", month: 5, week: -1, day: 6 },
                       { name: "Formeel einde Tweede Wereldoorlog", month: 7, day: 15 },
                       { name: "Prinsjesdag", month: 8, week: 3, day: 2 },
                       { name: "Verjaardag prinses Catharina-Amalia", month: 11, day: 7 },
                       { name: "Koninkrijksdag", month: 11, day: 15 }
                   ];
           
                   for (const date of flagDays) {
                       if (date.month === currentMonth) {
                           if (date.day === currentDay || (date.week && date.week === getNthWeekdayOfMonth(today, date.day))) {
                               // Set the flagDay token
                               //this.homey.flow.getConditionCard('dutch-flag-day').setToken('flagDay', date.name);
           
                               return isFlagDay === 'is';
                           }
                       }
                   }
           
                   // If it's not a flag day, set the flagDay token to an empty string or another desired value
                   //this.homey.flow.getConditionCard('dutch-flag-day').setToken('flagDay', '');
           
                   return isFlagDay === "isn't";
               });
           
          
          function getNthWeekdayOfMonth(date, day) {
            const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            const weekday = firstDay.getDay() - 1; // 0 = Monday, 1 = Tuesday, etc.
          
            const offset = (day - weekday + 7) % 7;
            const result = offset + 1;
          
            return result;
          }
          
      

        this.log('Dutch FlagDay has been initialized');
    }
}

module.exports = DutchFlagDay;
