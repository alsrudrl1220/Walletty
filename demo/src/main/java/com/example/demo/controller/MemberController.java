package com.example.demo.Controller;

import com.example.demo.dto.MemberDTO;
import com.example.demo.dto.SurveyDTO;
import com.example.demo.entity.SurveyEntity;
import com.example.demo.service.MemberService;
import com.example.demo.service.SurveyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor //MemberService에 대한 멤버를 사용 가능
public class MemberController {

    // 생성자 주입
    private final MemberService memberService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/member/save")    // name값을 requestparam에 담아온다
    public String save(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);
        memberService.save(memberDTO);

        return "login";
    }

    @GetMapping("/member/login")
    public String loginForm() {
        return "login";
    }


    @PostMapping("/member/login") // session : 로그인 유지
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공
            session.setAttribute("loginId", loginResult.getMemberId());
            return "main";
        } else {
            // login 실패
            return "login";
        }
    }

    private final SurveyService surveyService;

    @GetMapping("/member/survey")
    public String surveyForm() {
        return "survey";
    }

    @PostMapping("/member/survey")
    public String survey(@ModelAttribute SurveyDTO surveyDTO) {
        System.out.println("MemberController.survey");
        System.out.println("SurveyDTO = " + surveyDTO);
        surveyService.save(surveyDTO);

        return "login";
    }

    //백이랑 프론트랑 연동한다는 건 결국 설문조사 기능에서
    //1.프론트에서 받아온 정보를 백에 저장하는 기능과(이건 프론트에서 우선 정보를 보내줘야 함)
    //2.백의 정보를 프론트로 띄우는 건데(이건 db의 정보를 프론트로 전달)
    //지금은 1을 못하니까 1-2 연속은 안 되고 일단 db의 정보를 프론트로 보내는 것만 하자.
    //프론트로 id를 입력받아서 백으로 보내는 거는 못하니까 일단 가장 최신 정보를 db로 보내자.

    @RequestMapping("/api/v1/surveydto")
    @ResponseBody
    public SurveyDTO getSurveydto(){
        System.out.println("react connect");
        SurveyDTO surveydto = surveyService.getLatestSurveyDTO();
        System.out.println(surveydto);
        return surveydto;
    }


}
//MemberController.class