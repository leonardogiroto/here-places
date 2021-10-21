import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private platform: H.service.Platform;

  @ViewChild("map")
  public mapElement: ElementRef;

  public constructor() {
    this.platform = new H.service.Platform({
      "apikey": environment.HERE_API_MAPS,
    });
  }

  public ngOnInit() { }

  public ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.vector.normal.map,
        {
            zoom: 15,
            center: { lat: -23.563575, lng: -46.6541988 },
        }
    );

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    var parisMarker = new H.map.Marker({ lat: -23.563575, lng: -46.6541988 });
    map.addObject(parisMarker);

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);
  }
}
