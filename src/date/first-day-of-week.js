define([
	"./week-days"
], function( dateWeekDays ) {

/**
 * firstDayOfWeek
 */
return function( cldr ) {
	return dateWeekDays.indexOf( cldr.required.supplemental.weekData.firstDay() );
};

});
