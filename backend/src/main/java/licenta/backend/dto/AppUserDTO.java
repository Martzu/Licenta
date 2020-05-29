package licenta.backend.dto;


import licenta.backend.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestBody;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDTO {

    private Integer id;
    private String username;
    private String password;

    private Boolean iasiFilter;
    private Boolean clujFilter;
    private Boolean bucurestiFilter;

    private Boolean technicFilter;
    private Boolean umanisticFilter;

    public AppUserDTO(AppUser appUser){
        this.id = appUser.getId();
        this.username = appUser.getUsername();
        this.password = appUser.getPassword();

        this.iasiFilter = appUser.getIasiFilter();
        this.clujFilter = appUser.getClujFilter();
        this.bucurestiFilter = appUser.getBucurestiFilter();

        this.technicFilter = appUser.getTechnicFilter();
        this.umanisticFilter = appUser.getUmanisticFilter();

    }
}
