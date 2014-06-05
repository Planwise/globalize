define([
	"../common/format-message",
	"../util/object/values"
], function( formatMessage, objectValues ) {

/**
 * allPreset()
 *
 * @cldr [Cldr instance].
 *
 * Return an Array with all (skeleton, date, time, datetime) presets.
 */
return function( cldr ) {
	var result = [];

	// Skeleton
	result = objectValues( cldr.main( "dates/calendars/gregorian/dateTimeFormats/availableFormats", { throw: true } ) );

	// Time
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/timeFormats", { throw: true } ) ) );

	// Date
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/dateFormats", { throw: true } ) ) );

	// Datetime
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/dateTimeFormats", { throw: true } ) ).map(function( datetimeFormat, key ) {
		if ( typeof datetimeFormat !== "string" ) {
			return datetimeFormat;
		}
		return formatMessage( datetimeFormat, [
			cldr.main([
				"dates/calendars/gregorian/timeFormats",
				key
			], { throw: true } ),
			cldr.main( [
				"dates/calendars/gregorian/dateFormats",
				key
			], { throw: true } )
		]);
	}));

	return result.map(function( pattern ) {
		return { pattern: pattern };
	});
};

});
