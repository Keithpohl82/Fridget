package com.example.fridget.services;
import com.example.fridget.models.User;
import com.example.fridget.models.UserProfile;
import com.example.fridget.models.data.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    UserProfileRepository userProfileRepository;

    public void createProfile(User user){

        UserProfile profileBeingCreated = new UserProfile();
        profileBeingCreated.setUser(user);
        userProfileRepository.save(profileBeingCreated);

    }

}
