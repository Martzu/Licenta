package licenta.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {

    private String username;
    private String password;
    private Integer facultyId;
    private AccommodationDTO accommodationDTO;
    private boolean[] cityFilter;
    private boolean[] facultyTypeFilter;
}
