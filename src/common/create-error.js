define([
	"./format-message"
], function( formatMessage ) {

return function( code, message, attributes ) {
	var error;

	// Allow deferred-attributes.
	if ( typeof attributes === "function" ) {
		attributes = attributes();
	}

	message = code + ( message ? ": " + formatMessage( message, attributes ) : "" );
	error = new Error( message );
	error.code = code;

	// extend( error, attributes );
	Object.keys( attributes ).forEach(function( attribute ) {
		error[ attribute ] = attributes[ attribute ];
	});

	return error;
};

});
