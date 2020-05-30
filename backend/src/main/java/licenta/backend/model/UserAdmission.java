package licenta.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserAdmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private Faculty faculty;

    @ManyToOne
    @JoinColumn(name = "appuser_id", nullable = false)
    private AppUser appUser;

    private boolean confirmed;
    private String result = "";

    public UserAdmission(Faculty faculty, AppUser appUser){
        this.faculty = faculty;
        this.appUser = appUser;
    }

}
