{

function LayerTunnel()
    {
        var scriptName = "Layer Tunnel";
        
        
        // Checks to see if the user has an active Composition
        var activeItem = app.project.activeItem;
        if((activeItem == null) || !(activeItem instanceof CompItem))
            {
                alert("Please Open and Select a Composition First");
            }
        else{
            //
            var selectedLayers = activeItem.selectedLayers;
            
            // Must have a single layer selected for the function won't run
            if (activeItem.selectedLayers.length > 1)
                {
                    alert("Please Select One Layer At A Time");
                }
            
            if (activeItem.selectedLayers.length == 0)
                {
                    alert("You don't have a layer selected...");
                }
            
            else {
                
                var activeComp = activeItem;
                
                // turns on the draft 3d mode so we can access the Z-axis
                if(activeComp.draft3d == false)
                {
                    activeComp.draft3d = true;
                }
                
                app.beginUndoGroup(scriptName);
                
                //reduces the layers to simple variables
                var Layers = activeComp.selectedLayers;
                var Layer = activeComp.selectedLayers[0];
                
                //Sets the selected layer to work in 3d
                if(Layer.threeDLayer != true)
                {
                    Layer.threeDLayer = true;
                }
                
                Layer.rotationX.setValue([90]);
                Layer.rotationY.setValue([90]);
                
                var Layer2 = Layer.duplicate();
                var Layer3 = Layer.duplicate();
                var Layer4 = Layer.duplicate();
                
                
                //creates variables that contain the comp height and width in pixels
                var compDimX = activeComp.width;
                var compDimY = activeComp.height;
                
                //scales the layer you selected and uses the negative scale to flip them vertically or horizontally 
                //for reflection at the seams
                
                //takes all of the layers and repositions them in their respective quadrants
                Layer.position.setValue([(compDimX / 2) ,(compDimY / 2) , (compDimY / 4)]);
                Layer2.position.setValue([(compDimX / 2), (compDimY / 2), ((compDimY * (1 + (1 / 4))))]);
                Layer3.position.setValue([(compDimX / 2) , ((compDimY) / 2), (compDimY / 4)]);
                Layer4.position.setValue([(compDimX / 2), ((compDimY) / 2), ((compDimY * (1 + (1 / 4))))]);

                //sets the curvature of the footage to make a complete cylinder
                Layer.geometryOption.curvature.setValue([-100]);
                Layer2.geometryOption.curvature.setValue([-100]);
                Layer3.geometryOption.curvature.setValue([100]);
                Layer4.geometryOption.curvature.setValue([100]);
                
                //creates a smooth curvature
                Layer.geometryOption.segments.setValue([50]);
                Layer2.geometryOption.segments.setValue([50]);
                Layer3.geometryOption.segments.setValue([50]);
                Layer4.geometryOption.segments.setValue([50]);
                
                // Duplicate the layers to lengthen the tunnel
                var Layer5 = Layer.duplicate();
                var Layer6 = Layer2.duplicate();
                var Layer7 = Layer3.duplicate();
                var Layer8 = Layer4.duplicate();
                
                // Moves the layers to create the extra length
                Layer5.position.setValue([(compDimX / 2) ,(compDimY / 2) , (compDimY * (2 + (1 / 4)))]);
                Layer6.position.setValue([(compDimX / 2) ,(compDimY / 2) , (compDimY * (3 + (1 / 4)))]);
                Layer7.position.setValue([(compDimX / 2) ,(compDimY / 2) , (compDimY * (2 + (1 / 4)))]);
                Layer8.position.setValue([(compDimX / 2) ,(compDimY / 2) , (compDimY * (3 + (1 / 4)))]);
                
                //Supposed to flip some of the layers so they run endlessly down the tunnel
                Layer2.scale.setValue([-100, 100, 100]);
                Layer4.scale.setValue([-100, 100, 100]);
                Layer6.scale.setValue([-100, 100, 100]);
                Layer8.scale.setValue([-100, 100, 100]);
                
                //Creates a camera
                var camera = activeComp.layers.addCamera("Camera", [(compDimX / 2), (compDimY / 2)]);
                
                //Positions and scales the camera
                camera.cameraOption.zoom.setValue([1080]);
                camera.transform.position.setValue([(compDimX / 2), (compDimY / 2), -(compDimY / 2)]);
                camera.transform.pointOfInterest.setValue([(compDimX / 2), (compDimY / 2), (compDimY * 2)]);
                
                app.endUndoGroup();
            }
        }
    }
    //runs the function
    LayerTunnel(this);
}