<template>
    <div class="area-intro">
        <div class="content">
            <div>
                <h1>
                    안녕하세요!
                    <br />저는 견고한 UI와
                    <br />무결점 코드를 작성하는
                    <br />ENTJ 웹 퍼블리셔입니다✌
                </h1>
                <picture>
                    <source :srcset="photoMobile" media="(max-width: 1024px)" />
                    <img :src="photoDesktop" width="428" height="550" alt="이 포트폴리오의 주인인 은영환의 증명사진 입니다." />
                </picture>
            </div>
            <div>
                <a href="/resume.html" class="btn" aria-label="사람인 양식 이력서 보기">이력서 보기</a>
                <p>
                    안녕하세요! 4년 차 웹 퍼블리셔 은영환입니다.😁
                    <br /><br />모듈 단위의 유지보수에 최적화된 퍼블리싱에 관심이 많습니다.
                    <br />실제 사용하는 사용자의 입장에서 생각하는 걸 좋아해서 지속해서 <span>재고</span>하고 <span>제고</span>합니다.
                    <br /><br />사용자의 기억에 남도록 웹 페이지를 퍼블리싱 하는 걸 좋아합니다.
                    <br />좋아하니까 즐기게 되고, 더 잘하고 싶어집니다.
                    <br />그래서 여가를 할애하여 디자인 트렌드와 더 깊은 개발 언어를 학습합니다.
                    <br /><br />순도 90% ENTJ로써 강한 성취욕과 명예욕이 있습니다.
                    <br />따라서 현재 제 실력에 안주하지 않고 더 나은 웹 퍼블리셔
                    <br />더 나아가 웹 프론트엔드 개발자가 되기 위해 노력합니다.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import photoDesktop from "~/assets/image/photo-1920.webp";
import photoMobile from "~/assets/image/photo-1440.webp";
</script>
