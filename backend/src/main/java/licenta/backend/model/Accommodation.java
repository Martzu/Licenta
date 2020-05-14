package licenta.backend.model;


import licenta.backend.dto.AccommodationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String address;
    private String checkIn;
    private String checkOut;

    @OneToOne(mappedBy = "accommodation")
    private AppUser appUser;

    public Accommodation(AccommodationDTO accommodationDTO){
        this.name = accommodationDTO.getName();
        this.address = accommodationDTO.getAddress();
        this.checkIn = accommodationDTO.getCheckIn();
        this.checkOut = accommodationDTO.getCheckOut();
    }
}
