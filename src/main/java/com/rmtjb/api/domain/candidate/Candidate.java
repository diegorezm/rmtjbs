package com.rmtjb.api.domain.candidate;

import com.rmtjb.api.domain.user.User;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "rmtjbs_candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
    @Id @GeneratedValue private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String profilePictureKey;
    private String resumeKey;
    private String contact;

    @ElementCollection private List<String> jobPreferences;
}
