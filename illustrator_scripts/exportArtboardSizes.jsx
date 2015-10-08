#target illustrator  
  
artboardToPNGs();  
  
function artboardToPNGs() {  
  
    var folder = Folder.selectDialog();
    //var folder = Folder("~/Desktop")
    //$.writeln(folder.constructor.name)
    //if ( parseFloat( app.version ) < 15 ) { return; }  
  
    if ( app.documents.length == 0 ) { return; }  
  
    //app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;  
  
    var i, j, png24Opts, doc, artBds, scale, pngFile;  
  
    var numSizes = 3
    var successfulExports = 0
  
    png24Opts = new ExportOptionsPNG24();  
    png24Opts.matte = false;  
    png24Opts.transparency = true;  
    png24Opts.antiAliasing = true;  
    png24Opts.artBoardClipping = true;  
    png24Opts.saveAsHTML = false;  
  
    doc = app.activeDocument;    
    artBds = doc.artboards;  
    
    for (i = 0; i < artBds.length; i++ ) { 
        
        doc.artboards.setActiveArtboardIndex(i);
        
        var re =/^([\w .-]*)<([\d]*)>$/gi;
        var myArray = re.exec(artBds[i].name);
        if (myArray == null) {
            alert("Invalid name template on artboard: \"" + artBds[i].name + "\n Make sure that is use template name<size>")
            continue;
            }
    
        if (myArray.length > 1) {
         
            var regexName = myArray[1]
            var regexSize = myArray[2]

           for (j = 1; j < numSizes+1; j++ ) { 
            
                scale = ( regexSize * j / ( artBds[i].artboardRect[2] - artBds[i].artboardRect[0] ) ) * 100;
                pngFile = File( folder.fsName + "/" + regexName + "@" + j + "x" + ".png");
                png24Opts.horizontalScale = png24Opts.verticalScale = scale;  
                doc.exportFile( pngFile, ExportType.PNG24 ,png24Opts );  
                successfulExports++;
            }
        }
    }
  
    app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;  
    alert(successfulExports + " assets exported to: \n\"" + folder.fsName +"\"");  
  
};  