package licenta.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceFactoryImplementation implements ServiceFactory {


    private final AppUserService appUserService;
    private final FacultyService facultyService;

    @Override
    public AppUserService appUserService() {
        return appUserService;
    }

    @Override
    public FacultyService facultyService() {
        return facultyService;
    }
}
