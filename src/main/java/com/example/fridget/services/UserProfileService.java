package com.example.fridget.services;
import com.example.fridget.models.User;
import com.example.fridget.models.UserProfile;
import com.example.fridget.models.data.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class UserProfileService {

    @Autowired
    UserProfileRepository userProfileRepository;

    public void createProfile(User user){

        UserProfile profileBeingCreated = new UserProfile();
        profileBeingCreated.setUser(user);
        profileBeingCreated.setBirthday(LocalDate.of(1982,04,20));
        profileBeingCreated.setFirstName("Keith");
        profileBeingCreated.setLastName("Pohl");
        userProfileRepository.save(profileBeingCreated);

    }

}
