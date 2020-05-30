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
    private Integer universityAdmissionFee;
    private Integer facultyAdmissionFee;
    private Boolean isTechnic;


    @OneToMany(mappedBy = "faculty")
    private List<UserAdmission> userAdmissions = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "university_id")
    private University university;


    public Faculty(University university, String name, double latitude, double longitude, String address, String signUpPlace, String signUpDate, String examDate, String resultsDate, int universityAdmissionFee, int facultyAdmissionFee) {
        this.university = university;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.signUpPlace = signUpPlace;
        this.signUpDate = signUpDate;
        this.examDate = examDate;
        this.resultsDate = resultsDate;
        this.universityAdmissionFee = universityAdmissionFee;
        this.facultyAdmissionFee = facultyAdmissionFee;
        this.isTechnic = isTechnicFaculty(name);

    }

    public String toString(){
        return this.name + ' ' + this.latitude + ' ' + this.longitude + ' ' + this.address + ' ' + this.signUpDate + ' ' + this.signUpPlace + ' ' + this.examDate + ' ' + this.resultsDate + ' ' + this.universityAdmissionFee + ' ' + this.facultyAdmissionFee;
    }

    private boolean isTechnicFaculty(String name){
        return name.contains("Geologie") || name.contains("Geografie") || name.contains("Drept") ||
                name.contains("Litere") || name.contains("biologie") || name.contains("Biologie") ||
                name.contains("drept");
    }

}
