define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/type/number",
	"./common/validate/type/plain-object",
	"./common/validate/type/string",
	"./number/format",
	"./number/parse",
	"./number/pattern"
], function( Globalize, validateCldr, validateDefaultLocale, validatePresence, validateTypeNumber, validateTypePlainObject, validateTypeString, numberFormat, numberParse, numberPattern ) {

/**
 * .formatNumber( value, pattern )
 *
 * @value [Number]
 *
 * @attributes [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * Format a number according to the given attributes and default/instance locale.
 */
Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, attributes ) {
	var cldr, pattern;

	validatePresence( value, "value" );
	validateTypeNumber( value, "value" );
	validateTypePlainObject( attributes, "attributes" );

	attributes = attributes || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	try {
		if ( !attributes.pattern ) {
			pattern = numberPattern( attributes.style || "decimal", cldr );
		}

		return numberFormat( value, pattern, cldr, attributes );
	} catch( error ) {
		throw validateCldr( error );
	}
};

/**
 * .parseNumber( value )
 *
 * @value [String]
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 */
Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value ) {
	var cldr, pattern;

	validatePresence( value, "value" );
	validateTypeString( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	try {
		// TODO: What about per mille? Which "style" does it belong to?
		pattern = numberPattern( value.indexOf( "%" ) !== -1 ? "percent" : "decimal", cldr );

		return numberParse( value, pattern, cldr );
	} catch( error ) {
		throw validateCldr( error );
	}
};

return Globalize;

});
