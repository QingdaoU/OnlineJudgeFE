<template>
  <panel>
    <div slot="title">{{$t('m.Frequently_Asked_Questions')}}</div>
    <div class="content markdown-body">
      <ul>
        <li>{{$t('m.Where_is_the_input_and_the_output')}}
          <p>
            여러분이 작성하신 프로그램은 <code>stdin</code>('{{$t('m.Standard_Input')}}') 과  <code>stdout</code>('{{$t('m.Standard_Output')}}') 을 통해서 입력과 출력을 받아요.
          </p>
          <p>
            예를 들어서 C언어는 <code>scanf</code>로 C++은 <code>cin</code>으로 <code>stdin</code>('{{$t('m.Standard_Input')}}') 을 읽어오고, C언어는 printf, C++은 coutd을 통해서 <code>stdout</code>('{{$t('m.Standard_Output')}}')을 작성해요.
          </p>
          <p>또한 파일을 작성 또는 읽어오는 기능이 포함된 경우, <code>{{$t('m.Runtime_Error')}}</code> 에러가 발생할 수 있어요.</p>
        </li>
        <li>{{$t('m.What_is_the_meaning_of_submission_execution_time')}} 
        <p>{{$t('m.What_is_the_meaning_of_submission_execution_time_answer')}} 
        </p>
        </li>
        <li>{{$t('m.How_Can_I_use_CPP_Int64')}}
          <p><code>long long</code>을 선언하고 <code>cin/cout</code> 또는 <code>%lld</code>과(와) 함께 사용해야 하며, <code>__int64</code>를 사용하면 <code>{{$t('m.Compile_Error')}}</code>가 발생해요</p>
        </li>
        <li>{{$t('m.Java_specifications')}}
          <p>모든 자바 프로그램은 <code>Main class</code>안에 static <code>Main method</code>에서 시작해요.</p>
          <p>또한 <code>public class</code> 사용을 금지하며, 이는 <code>Main class</code>에도 적용하면 되요.</p>
          <p>이를 어길 경우 <code>{{$t('m.Compile_Error')}}</code>가 발생할수 있어요.</p>
          <p>{{$t('m.Java_specifications_answer_part_1')}} <code>Main</code> {{$t('m.Java_specifications_answer_part_2')}} <code>Main</code> {{$t('m.Java_specifications_answer_part_3')}}</p>
        </li>
        <li>{{$t('m.About_presentation_error')}}
          <p>
            코테 시스템은 잘못된 출력 형식으로 인한 오류가 없어요. 실행 결과물의 앞 뒤의 빈칸 또는 마지막 빈 줄은 자동으로 제거되요!
          </p>

        </li>
        <li>{{$t('m.How_to_report_bugs')}}
          <p>
            <a href="https://www.inflearn.com/" target="_blank">인프런</a> 접속후 <b>문의하기</b> -> <b>실시간 버그/피드백</b> -> <b>실시간 버그 발견! 👀</b> 으로 접속하셔서 버그 및 피드백에서 <b>주스🥤</b>를 찾아주세요.
          </p>
        </li>
      </ul>
    </div>
  </panel>
</template>

<script>
</script>

<style lang="less" scoped>
  .content {
    font-size: 16px;
    margin: 0 50px 40px 50px;
    > ul {
      list-style: disc;
      li {
        font-size: 16px;
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
        p {
          font-size: 14px;
          margin-top: 5px;
        }
      }
    }
  }
</style>
