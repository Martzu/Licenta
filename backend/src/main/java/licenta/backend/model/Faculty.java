package licenta.backend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "faculty")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table
public class Faculty {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private double latitude;
    private double longitude;
    private String address;
    private String signUpPlace;
    private String signUpDate;
    private String examDate;
    private String resultsDate;



    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "user_admissions",
            joinColumns = { @JoinColumn(name = "faculty_id")},
            inverseJoinColumns = { @JoinColumn(name = "user_id")}
    )
    private List<AppUser> appUsers = new ArrayList<>();

    public String toString(){
        return this.name + ' ' + this.latitude + ' ' + this.longitude + ' ' + this.address + ' ' + this.signUpDate + ' ' + this.signUpPlace + ' ' + this.examDate + ' ' + this.resultsDate;
    }

}
