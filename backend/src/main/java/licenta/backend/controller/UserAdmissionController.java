package licenta.backend.controller;


import licenta.backend.dto.Test;
import licenta.backend.model.AppUser;
import licenta.backend.service.ServiceFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@Component
@RequiredArgsConstructor
@RestController
public class UserAdmissionController {
    private final ServiceFactory serviceFactory;

    @PostMapping("/user-admission/confirm")
    public void confirmUserAdmissionParticipation(@RequestBody Test test) throws Exception{
        serviceFactory.appUserService().confirmParticipationToFacultyAdmission(test.getUsername(), test.getFacultyId());
    }
}
