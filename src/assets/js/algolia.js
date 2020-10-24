function algolia() {
    var input = document.querySelector('#input-map');
    console.log("input container : " + input);
    (function() {
      var placesAutocomplete = places({
        appId: 'plOC634TT6IV',
        apiKey: '68c047c4f350812c246740cbf1ec4f14',
        container: document.querySelector('#input-map')
      });
      placesAutocomplete.on('change', function resultSelected(e) {
        document.querySelector('#state').value = e.suggestion.administrative || '';
        document.querySelector('#city').value = e.suggestion.city || '';
        document.querySelector('#zip').value = e.suggestion.postcode || '';
      });
      var map = L.map('map-example-container', {
        scrollWheelZoom: false,
        zoomControl: false
      });
  
      var osmLayer = new L.TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 1,
          maxZoom: 13,
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }
      );
  
      var markers = [];
  
      map.setView(new L.LatLng(0, 0), 1);
      map.addLayer(osmLayer);
  
      placesAutocomplete.on('suggestions', handleOnSuggestions);
      placesAutocomplete.on('cursorchanged', handleOnCursorchanged);
      placesAutocomplete.on('change', handleOnChange);
      placesAutocomplete.on('clear', handleOnClear);
  
      function handleOnSuggestions(e) {
        markers.forEach(removeMarker);
        markers = [];
  
        if (e.suggestions.length === 0) {
          map.setView(new L.LatLng(0, 0), 1);
          return;
        }
  
        e.suggestions.forEach(addMarker);
        findBestZoom();
      }
  
      function handleOnChange(e) {
        markers
          .forEach(function(marker, markerIndex) {
            if (markerIndex === e.suggestionIndex) {
              markers = [marker];
              marker.setOpacity(1);
              findBestZoom();
            } else {
              removeMarker(marker);
            }
          });
      }
  
      function handleOnClear() {
        map.setView(new L.LatLng(0, 0), 1);
        markers.forEach(removeMarker);
      }
  
      function handleOnCursorchanged(e) {
        markers
          .forEach(function(marker, markerIndex) {
            if (markerIndex === e.suggestionIndex) {
              marker.setOpacity(1);
              marker.setZIndexOffset(1000);
            } else {
              marker.setZIndexOffset(0);
              marker.setOpacity(0.5);
            }
          });
      }
  
      function addMarker(suggestion) {
        var marker = L.marker(suggestion.latlng, {draggable: 'true',opacity: .4});
        marker.addTo(map);
        markers.push(marker);
        var position = marker.getLatLng();
        marker.setLatLng(position, {
          draggable: 'true'
        }).bindPopup(position).update();
        $("#Latitude").val(position.lat);
        $("#Longitude").val(position.lng).keyup();
        marker.on('dragend', function(event) {
          var position = marker.getLatLng();
          marker.setLatLng(position, {
            draggable: 'true'
          }).bindPopup(position).update();
          $("#Latitude").val(position.lat);
          $("#Longitude").val(position.lng).keyup();
        });
  
        $("#Latitude, #Longitude").change(function() {
          var position = [parseInt($("#Latitude").val()), parseInt($("#Longitude").val())];
          marker.setLatLng(position, {
            draggable: 'true'
          }).bindPopup(position).update();
          map.panTo(position);
        });
      }
  
      function removeMarker(marker) {
        map.removeLayer(marker);
      }
  
      function findBestZoom() {
        var featureGroup = L.featureGroup(markers);
        map.fitBounds(featureGroup.getBounds().pad(0.5), {animate: false});
      }
  
  /*/////
      ////
      // use below if you want to specify the path for leaflet's images
      //L.Icon.Default.imagePath = '@Url.Content("~/Content/img/leaflet")';
  
      var curLocation = [0, 0];
      // use below if you have a model
      // var curLocation = [@Model.Location.Latitude, @Model.Location.Longitude];
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
  
      map.attributionControl.setPrefix(false);
  
      var marker = new L.marker(curLocation, {
        draggable: 'true'
      });
  
      marker.on('dragend', function(event) {
        var position = marker.getLatLng();
        marker.setLatLng(position, {
          draggable: 'true'
        }).bindPopup(position).update();
        $("#Latitude").val(position.lat);
        $("#Longitude").val(position.lng).keyup();
      });
  
      $("#Latitude, #Longitude").change(function() {
        var position = [parseInt($("#Latitude").val()), parseInt($("#Longitude").val())];
        marker.setLatLng(position, {
          draggable: 'true'
        }).bindPopup(position).update();
        map.panTo(position);
      });
  
      map.addLayer(marker);
      ////
      ////
      ///*/
    })();
  
  }
  
  