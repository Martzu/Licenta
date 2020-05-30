package licenta.backend.repository;

import licenta.backend.model.AppUser;
import licenta.backend.model.Faculty;
import licenta.backend.model.UserAdmission;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface UserAdmissionRepository extends Repository<UserAdmission, Integer>{

    public List<UserAdmission> findUserAdmissionsByAppUser(AppUser appUser);

    public UserAdmission save(UserAdmission userAdmission);

    public void removeByAppUserAndFaculty(AppUser appUser, Faculty faculty);

}
