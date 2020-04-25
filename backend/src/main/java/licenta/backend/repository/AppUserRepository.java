package licenta.backend.repository;

import licenta.backend.model.AppUser;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface AppUserRepository extends Repository<AppUser, Integer> {

    public Optional<AppUser> findById(Integer id);

    public AppUser save(AppUser appUser);

    public void removeById(Integer id);


}
