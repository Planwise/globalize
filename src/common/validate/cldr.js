define([
	"../format-message",
	"../validate"
], function( formatMessage, validate ) {

return function( cldr, method, path, file ) {
	validate( "E_MISSING_CLDR", "Missing required CLDR content `{file}`.", typeof cldr[ method ]( path ) !== "undefined", {
		file: formatMessage( file, cldr.attributes )
	});
};

});
