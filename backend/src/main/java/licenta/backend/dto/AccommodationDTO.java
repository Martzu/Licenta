package licenta.backend.dto;

import licenta.backend.model.Accommodation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationDTO {

    private Integer id;
    private String name;
    private String address;
    private String checkIn;
    private String checkOut;

    public AccommodationDTO(Accommodation accommodation){
        this.id = accommodation.getId();
        this.name = accommodation.getName();
        this.address = accommodation.getAddress();
        this.checkIn = accommodation.getCheckIn();
        this.checkOut = accommodation.getCheckOut();
    }
}
