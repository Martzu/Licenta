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

    public AppUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    @ManyToMany(mappedBy = "appUsers", cascade = {CascadeType.ALL})
    private List<Faculty> faculties;
}
