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
	var requiredCldr = cldr.required,
		result = [];

	// Skeleton
	result = objectValues( requiredCldr.main( "dates/calendars/gregorian/dateTimeFormats/availableFormats" ) );

	// Time
	result = result.concat( objectValues( requiredCldr.main( "dates/calendars/gregorian/timeFormats" ) ) );

	// Date
	result = result.concat( objectValues( requiredCldr.main( "dates/calendars/gregorian/dateFormats" ) ) );

	// Datetime
	result = result.concat( objectValues( requiredCldr.main( "dates/calendars/gregorian/dateTimeFormats" ) ).map(function( datetimeFormat, key ) {
		if ( typeof datetimeFormat !== "string" ) {
			return datetimeFormat;
		}
		return formatMessage( datetimeFormat, [
			requiredCldr.main([
				"dates/calendars/gregorian/timeFormats",
				key
			]),
			requiredCldr.main([
				"dates/calendars/gregorian/dateFormats",
				key
			])
		]);
	}));

	return result.map(function( pattern ) {
		return { pattern: pattern };
	});
};

});
