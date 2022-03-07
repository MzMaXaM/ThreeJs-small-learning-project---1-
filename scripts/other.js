function log(message, color = "White") {

  switch (color) {
      case "success":  
           color = "Green"; 
           break;
      case "info":     
              color = "DodgerBlue";  
           break;
      case "error":   
           color = "Red";     
           break;
      case "warning":  
           color = "Orange";   
           break;
      default: 
           color = color;
  }

  console.log("%c" + message, "color:" + color);
}