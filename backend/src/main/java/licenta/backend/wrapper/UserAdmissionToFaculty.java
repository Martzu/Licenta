package licenta.backend.wrapper;


import licenta.backend.model.Faculty;
import licenta.backend.model.UserAdmission;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAdmissionToFaculty {
    private UserAdmission userAdmission;
    private Faculty faculty;
    private boolean confirmed;

    public UserAdmissionToFaculty(UserAdmission userAdmission, Faculty faculty){
        this.userAdmission = userAdmission;
        this.faculty = faculty;
        this.confirmed = userAdmission.isConfirmed();
    }
}
