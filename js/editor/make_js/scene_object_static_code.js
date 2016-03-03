var MakeStaticCode = function(sceneObjectsJSBuilder)
{
	this.makeLine = sceneObjectsJSBuilder.makeLine;
	var makeLine = this.makeLine;

	// makeLine.line_tab_0(clone);
	// makeLine.line_tab_0('\n');

	// makeLine.line_tab_0(disposeNode);
	// makeLine.line_tab_0('\n');

	// makeLine.line_tab_0(disposeHierarchy);
	// makeLine.line_tab_0('\n');

	// makeLine.line_tab_0("var InsertGroup = " + InsertGroup + ";");
	// makeLine.line_tab_0('\n');

	// makeLine.line_tab_0("var Item3D = " + Item3D + ";");
	// makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var InsertPlainMesh = " + InsertPlainMesh + ";");
	makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var InsertBoxMesh = " + InsertBoxMesh + ";");
	makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var Insert3dText = " + Insert3dText + ";");
	makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var Mirror = " + Mirror + ";");
	makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var InsertCustomSphere = " + InsertCustomSphere + ";");
	makeLine.line_tab_0('\n');

	makeLine.line_tab_0("var InsertSphere = " + InsertSphere + ";");
	makeLine.line_tab_0('\n');
}