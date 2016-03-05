function messageDialog( text, title )
{
	//alert( text );
	var dialog = new Dialog( text, title );
}

var Dialog = function( text, title )
{
	var _this = this;
	/*
		dialog_root
		dialog_header
		
		dialog_title
		dialog_close
		
		dialog_body
		dialog_buttons

		dialog_ok
		dialog_ok_cancel
	*/
	var dialog_root = document.getElementById( 'dialog_root' );
	var dialog_header = document.getElementById( 'dialog_header' );

	var dialog_title = document.getElementById( 'dialog_title' );
	var dialog_close = document.getElementById( 'dialog_close' );

	var dialog_body = document.getElementById( 'dialog_body' );
	var dialog_buttons = document.getElementById( 'dialog_buttons' );

	var dialog_ok = document.getElementById( 'dialog_ok' );
	dialog_ok.style[ "display" ] = "block";

	var dialog_ok_cancel = document.getElementById( 'dialog_ok_cancel' );
	dialog_ok_cancel.style[ "display" ] = "none";

	dialog_root.style[ "left" ] = ( -(360/2) + window.innerWidth/2) + 'px';

	dialog_title.innerText = title;
	dialog_body.innerText = text;

	dialog_root.style[ "display" ] = "block";
	//document.body.appendChild( dialog_root );

	dialog_buttons.style[ "background-color" ] = "rgba( 0, 0, 0, 0.3)";
	dialog_buttons.style[ "box-shadow" ] = "0px 0px 6px rgba( 255, 255, 255, 0.4)";

	dialog_close.onclick = function()
	{
		dialog_root.style[ "display" ] = "none";
	}

	dialog_ok.onclick = function()
	{
		dialog_root.style[ "display" ] = "none";
	}
};

var DialogYesNo = function( text, title, yesNoCallBack)
{
	var _this = this;
	/*
		dialog_root
		dialog_header
		
		dialog_title
		dialog_close
		
		dialog_body
		dialog_buttons

		dialog_ok
		dialog_ok_cancel
	*/
	var dialog_root = document.getElementById( 'dialog_root' );
	var dialog_header = document.getElementById( 'dialog_header' );

	var dialog_title = document.getElementById( 'dialog_title' );
	var dialog_close = document.getElementById( 'dialog_close' );

	var dialog_body = document.getElementById( 'dialog_body' );
	var dialog_buttons = document.getElementById( 'dialog_buttons' );

	var dialog_ok = document.getElementById( 'dialog_ok' );
	dialog_ok.style[ "display" ] = "none";

	var dialog_ok_cancel = document.getElementById( 'dialog_ok_cancel' );
	dialog_ok_cancel.style[ "display" ] = "block";

	dialog_root.style[ "left" ] = ( -(360/2) + window.innerWidth/2) + 'px';

	dialog_title.innerText = title;
	dialog_body.innerText = text;

	dialog_root.style[ "display" ] = "block";
	//document.body.appendChild( dialog_root );
	dialog_buttons.style[ "background-color" ] = "rgba( 0, 0, 0, 0 )";
	dialog_buttons.style[ "box-shadow" ] = "0px 0px 0px rgba( 255, 255, 255, 0.4)";

	dialog_close.onclick = function()
	{
		yesNoCallBack( 0 );
		dialog_root.style[ "display" ] = "none";
	}

	var button_yes = document.getElementById( 'button_yes' );
	button_yes.onclick = function()
	{
		yesNoCallBack( 1 );
		dialog_root.style[ "display" ] = "none";
	}

	var button_no = document.getElementById( 'button_no' );
	button_no.onclick = function()
	{
		yesNoCallBack( 0 );
		dialog_root.style[ "display" ] = "none";
	}
};
