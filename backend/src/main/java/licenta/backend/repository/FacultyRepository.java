package licenta.backend.repository;

import licenta.backend.model.AppUser;
import licenta.backend.model.Faculty;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface FacultyRepository extends Repository<Faculty, Integer> {

    public Optional<Faculty> findById(Integer id);

    public Faculty save(Faculty faculty);

    public List<Faculty> findAll();

    public Optional<Faculty> findByName(String name);

    public List<Faculty> findByAppUsersIn(List<AppUser> appUsers);


}
