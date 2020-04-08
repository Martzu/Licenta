
import AccommodationData from "./AccommodationData";
import MarkerCoordinates from "./MarkerCoordinates";

export default interface LocationData {
    location: MarkerCoordinates,
    accommodationDetails: AccommodationData
};