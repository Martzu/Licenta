package licenta.backend.controller;


import licenta.backend.dto.FacultyDTO;
import licenta.backend.dto.Test;
import licenta.backend.model.AppUser;
import licenta.backend.service.AppUserService;
import licenta.backend.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequiredArgsConstructor
public class FacultyController {

    private final ServiceFactory serviceFactory;

    @PostMapping("/faculty")
    public void participateToAdmission(@RequestBody Test test) throws Exception {
        serviceFactory.appUserService().participateToFacultyAdmission(test.getUsername(), test.getFacultyId());
    }

    @DeleteMapping("/faculty")
    public void removeUserAdmission(@RequestBody Test test) throws Exception{
        serviceFactory.appUserService().removeParticipationFromFacultyAdmission(test.getUsername(), test.getFacultyId());
    }

    @PostMapping("/unattending")
    public List<FacultyDTO> getAdmissionsNotParticipating(@RequestBody Test test) throws Exception {
        return serviceFactory.appUserService().getAppUserNotSignedAdmissions(test.getUsername()).stream().sorted(Comparator.comparing(FacultyDTO::getName)).collect(Collectors.toList());
    }

    @GetMapping("/faculties")
    public List<FacultyDTO> getAllFaculties(){
        return serviceFactory.facultyService().getAllFaculties().stream().sorted(Comparator.comparing(FacultyDTO::getName)).collect(Collectors.toList());
    }

    @PostMapping("/user/faculties")
    public List<FacultyDTO> getAllUserAdmissions(@RequestBody Test test) throws Exception {
        return serviceFactory.appUserService().getAppUserAdmissions(test.getUsername()).stream().sorted(Comparator.comparing(FacultyDTO::getName)).collect(Collectors.toList());
    }

}