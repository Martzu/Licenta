package licenta.backend.dto;


import licenta.backend.model.Faculty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacultyDTO {

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
    private String university;
    private Boolean isTechnic;
    private Boolean confirmed;
    private String result;

    public FacultyDTO(Faculty faculty) {
        this.id = faculty.getId();
        this.name = faculty.getName();
        this.latitude = faculty.getLatitude();
        this.longitude = faculty.getLongitude();
        this.address = faculty.getAddress();
        this.signUpPlace = faculty.getSignUpPlace();
        this.signUpDate = faculty.getSignUpDate();
        this.examDate = faculty.getExamDate();
        this.resultsDate = faculty.getResultsDate();
        this.universityAdmissionFee = faculty.getUniversityAdmissionFee();
        this.facultyAdmissionFee = faculty.getFacultyAdmissionFee();
        this.university = faculty.getUniversity().getAbbreviation();
        this.isTechnic = faculty.getIsTechnic();//TODO add confirmed
    }

    public FacultyDTO(Faculty faculty, boolean isConfirmed) {
        this.id = faculty.getId();
        this.name = faculty.getName();
        this.latitude = faculty.getLatitude();
        this.longitude = faculty.getLongitude();
        this.address = faculty.getAddress();
        this.signUpPlace = faculty.getSignUpPlace();
        this.signUpDate = faculty.getSignUpDate();
        this.examDate = faculty.getExamDate();
        this.resultsDate = faculty.getResultsDate();
        this.universityAdmissionFee = faculty.getUniversityAdmissionFee();
        this.facultyAdmissionFee = faculty.getFacultyAdmissionFee();
        this.university = faculty.getUniversity().getAbbreviation();
        this.isTechnic = faculty.getIsTechnic();//TODO add confirmed
        this.confirmed = isConfirmed;
    }
}
