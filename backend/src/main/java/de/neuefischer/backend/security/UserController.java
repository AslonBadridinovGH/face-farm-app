package de.neuefischer.backend.security;
import de.neuefischer.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public String getMe() {

        if ("anonymousUser".equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            return "anonymousUser";
        }
        return userService.getUserById(SecurityContextHolder.getContext().getAuthentication().getName());
    }

}