define([
	"cldr",
	"./common/create-error",
	"./common/format-message",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/type",
	"./common/validate/type/locale",
	"./common/validate/type/plain-object",
	"./util/always-cldr",
	"./util/is-plain-object"
], function( Cldr, createError, formatMessage, validateCldr, validateDefaultLocale, validatePresence, validateType, validateTypeLocale, validateTypePlainObject, alwaysCldr, isPlainObject ) {

function setCldr( locale ) {
	var cldr = alwaysCldr( locale );
	cldr.required = new Cldr( cldr.locale, { throwOnMissing: true } );
	validateLikelySubtags( cldr );
	return cldr;
}

function validateLikelySubtags( cldr ) {
	try {
		cldr.required.get( "supplemental/likelySubtags" );
	} catch( error ) {
		throw validateCldr( error );
	}
}

/**
 * [new] Globalize( locale|cldr )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Create a Globalize instance.
 */
function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	validatePresence( locale, "locale" );
	validateTypeLocale( locale, "locale" );

	this.cldr = setCldr( locale );
}

/**
 * Globalize.load( json )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function( json ) {
	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

	Cldr.load( json );
};

/**
 * Globalize.locale( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Set default Cldr instance if locale or cldr argument is passed.
 *
 * Return the default Cldr instance.
 */
Globalize.locale = function( locale ) {
	validateTypeLocale( locale, "locale" );

	if ( arguments.length ) {
		this.cldr = setCldr( locale );
	}
	return this.cldr;
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._createError = createError;
Globalize._formatMessage = formatMessage;
Globalize._isPlainObject = isPlainObject;
Globalize._validateCldr = validateCldr;
Globalize._validateDefaultLocale = validateDefaultLocale;
Globalize._validatePresence = validatePresence;
Globalize._validateTypePlainObject = validateTypePlainObject;
Globalize._validateType = validateType;

return Globalize;

});
