package licenta.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "appUser")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;

    private Boolean iasiFilter;
    private Boolean clujFilter;
    private Boolean bucurestiFilter;

    private Boolean technicFilter;
    private Boolean umanisticFilter;

    public AppUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public AppUser(String username, String password, Boolean iasiFilter, Boolean clujFilter, Boolean bucurestiFilter, Boolean technicFilter, Boolean umanisticFilter){
        this.username = username;
        this.password = password;
        this.iasiFilter = iasiFilter;
        this.clujFilter = clujFilter;
        this.bucurestiFilter = bucurestiFilter;
        this.technicFilter = technicFilter;
        this.umanisticFilter = umanisticFilter;
    }

    @ManyToMany(mappedBy = "appUsers", cascade = {CascadeType.ALL})
    private List<Faculty> faculties;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "accommodation_id", referencedColumnName = "id")
    private Accommodation accommodation;
}
