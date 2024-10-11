window.onload = () => {
    const paramsString = document.location.search;
    const searchParams = new URLSearchParams(paramsString);
  
    // Iterate through the search parameters and update the HTML content
    for (const param of searchParams) {
      const elementId = param[0];
      const elementValue = decodeURIComponent(param[1]);
      const element = document.getElementById(elementId);
  
      if (element !== null) {
        element.textContent = elementValue;
      }
  
      // Special cases for address and email fields to create links
      if (param[0] === "address") {
        element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
      } else if (param[0] === "email") {
        element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
      }
    }
  };
  