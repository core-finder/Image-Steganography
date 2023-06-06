function handleFileSelect(evt) {
    var original = document.getElementById("original"),
      stego = document.getElementById("stego"),
      img = document.getElementById("img"),
      cover = document.getElementById("cover"),
      message = document.getElementById("message");
    if (!original || !stego) return;
  
    var files = evt.target.files; // FileList object
  
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match("image.*")) {
        continue;
      }
  
      var reader = new FileReader();
  
      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          img.src = e.target.result;
          img.title = escape(theFile.name);
          stego.classList.add("half");
          cover.src = img.src; // Display the chosen image as the encoded image
          message.innerHTML = "";
          message.parentNode.classList.add("invisible");
          updateCapacity();
        };
      })(f);
  
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  
  function copyText() {
    let cpText = document.getElementById("message");
    let text = cpText.innerText;
    console.log(text);
    let textArea = document.createElement("textarea");
    textArea.width = "1px";
    textArea.height = "1px";
    textArea.background = "transparents";
    textArea.value = text;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    let btnText = document.getElementById("copy");
    btnText.innerText = "Copied!";
  }
  
  function hide() {
    var stego = document.getElementById("stego"),
      img = document.getElementById("img"),
      cover = document.getElementById("cover"),
      message = document.getElementById("message"),
      textarea = document.getElementById("text"),
      download = document.getElementById("download");
    if (img && textarea) {
      cover.src = steg.encode(textarea.value, img);
      stego.classList.add("half");
      message.innerHTML = "";
      message.parentNode.classList.add("invisible");
      download.href = cover.src;
      download.download = "encoded_image.png"; // Set the download attribute with the desired filename

      alert("Message is Hidden!, Now click the Download button under Encoded Image");
    }
  }
  
  function read() {
    var img = document.getElementById("img"),
      cover = document.getElementById("cover"),
      message = document.getElementById("message"),
      textarea = document.getElementById("text");
    if (img && textarea) {
      message.innerHTML = steg.decode(cover); // Decode from the encoded image instead of the original image
      if (message.innerHTML !== "") {
        message.parentNode.classList.remove("invisible");
        textarea.value = message.innerHTML;
        updateCapacity();
      }
    }
  }
  
  function updateCapacity() {
    var img = document.getElementById("img"),
      textarea = document.getElementById("text");
    if (img && textarea)
      document.getElementById("capacity").innerHTML =
        "(" +
        textarea.value.length +
        "/" +
        steg.getHidingCapacity(img) +
        " chars)";
  }
  
  window.onload = function () {
    document
      .getElementById("file")
      .addEventListener("change", handleFileSelect, false);
    document.getElementById("hide").addEventListener("click", hide, false);
    document.getElementById("read").addEventListener("click", read, false);
    document
      .getElementById("text")
      .addEventListener("keyup", updateCapacity, false);
    updateCapacity();
  };
  